
const items = {
  "페트병": {
    category: "플라스틱",
    steps: [
      "병 안의 내용물을 비우세요.",
      "가능하면 물로 헹궈 이물질을 제거하세요.",
      "라벨을 제거하고, 뚜껑과 몸체는 지역 배출 기준에 따라 분리하세요."
    ],
    warning: "투명 페트병 별도 배출 여부와 세부 기준은 거주 지역 안내를 확인하세요."
  },
  "종이컵": {
    category: "종이류 여부 확인",
    steps: [
      "내용물을 비우세요.",
      "컵 안쪽의 코팅과 오염 여부를 확인하세요.",
      "거주 지역의 종이팩·종이컵 분리배출 기준을 확인하세요."
    ],
    warning: "종이컵은 일반 종이와 배출 방식이 다를 수 있습니다."
  },
  "건전지": {
    category: "폐건전지",
    steps: [
      "일반 쓰레기와 섞지 마세요.",
      "주민센터나 공동주택 등에 설치된 폐건전지 수거함을 이용하세요."
    ],
    warning: "누액이 있거나 손상된 건전지는 직접 만지지 말고 지역 안내를 따르세요."
  },
  "유리병": {
    category: "유리류",
    steps: [
      "내용물을 비우고 가능한 한 깨끗이 헹구세요.",
      "뚜껑과 병을 분리하세요.",
      "지역의 유리병 배출 기준에 맞춰 배출하세요."
    ],
    warning: "깨진 유리는 다칠 위험이 있으므로 일반 유리병 수거함에 넣지 말고 지자체의 안전 배출 안내를 확인하세요."
  },
  "캔": {
    category: "금속캔",
    steps: [
      "내용물을 완전히 비우세요.",
      "가능하면 헹궈 이물질을 제거하세요.",
      "지역 배출 기준에 맞춰 캔류 수거함에 배출하세요."
    ],
    warning: "내용물이 남아 있거나 위험한 물질이 들어 있던 용기는 별도 안내를 확인하세요."
  }
};

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const resultSection = document.querySelector("#result-section");

function showResult(name) {
  const item = items[name];

  if (!item) {
    resultSection.innerHTML = `
      <div class="result-card">
        <h2>검색 결과가 없습니다.</h2>
        <p>다른 품목 이름으로 검색해 주세요.</p>
        <p>현재 안내 가능한 품목: ${Object.keys(items).join(", ")}</p>
      </div>
    `;
    return;
  }

  const steps = item.steps
    .map(step => `<li>${step}</li>`)
    .join("");

  resultSection.innerHTML = `
    <article class="result-card">
      <span class="category">${item.category}</span>
      <h2>${name} 배출 방법</h2>
      <ol>${steps}</ol>
      <p class="warning"><strong>주의:</strong> ${item.warning}</p>
    </article>
  `;
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    input.focus();
    return;
  }

  const matchedName = Object.keys(items).find(
    name => name.toLowerCase() === query.toLowerCase()
  );

  showResult(matchedName || query);
});

document.querySelectorAll("[data-item]").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.item;
    input.value = name;
    showResult(name);
  });
});
