const company = fetchData();

async function fetchData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        return null;
    }
}

company.then(data => {
    data.companies.slice(0, 4).forEach(company => addCompanyToTab(company));
});
function addCompanyToTab(company) {
    var tabContent = document.querySelector('.tab-content');

    var li = document.createElement("li");

    var trendCard = document.createElement("div");
    trendCard.classList.add("trend-card");

    var cardTitleWrapper = document.createElement("div");
    cardTitleWrapper.classList.add("card-title-wrapper");

    var a = document.createElement("a");
    a.href = "#";
    a.classList.add("card-title");
    a.innerHTML = company.name + '<span class="span">' + company.symbol.toUpperCase() + '</span>';

    cardTitleWrapper.appendChild(a);

    var cardValue = document.createElement("data");
    cardValue.classList.add("card-value");
    cardValue.value = company.total_current_value_usd;
    cardValue.innerHTML = "$" + company.total_current_value_usd;

    var cardAnalytics = document.createElement("div");
    cardAnalytics.classList.add("card-analytics");

    var currentPrice = document.createElement("data");
    currentPrice.classList.add("current-price");
    currentPrice.value = company.total_holdings;
    currentPrice.innerHTML = company.total_holdings;

    var badge = document.createElement("div");
    badge.classList.add("badge");
    badge.classList.add(company.total_holdings > 0 ? "green" : "red");
    badge.innerHTML = company.total_holdings > 0 ? "+" + company.total_holdings : company.total_holdings;

    cardAnalytics.appendChild(currentPrice);
    cardAnalytics.appendChild(badge);

    trendCard.appendChild(cardTitleWrapper);
    trendCard.appendChild(cardValue);
    trendCard.appendChild(cardAnalytics);

    li.appendChild(trendCard);

    tabContent.appendChild(li);
} 