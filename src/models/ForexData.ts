import MetaData from "./MetaData"

type ForexData = MetaData & {
  ask: number,
  askStr: string,
  bid: number,
  bidStr: string,
  latestValueStr: string,
  changeAmountStr: string,
  changeRate: number,
  changeRateStr: string,
  monthlyChangeAmountStr: string,
  monthlyChangeRate: number,
  monthlyChangeRateStr: string,
  yearlyChangeAmountStr: string,
  yearlyChangeRate: number,
  yearlyChangeRateStr: string,
}
export default ForexData

// const asd = [{
//   "active": true, "ask": 2760.79, "ask_str": "2.760,79", "asset_key": "ceyrek-altin", "asset_name": "Çeyrek Altın",
//   "asset_type": "G", "bid": 2699.82, "bid_str": "2.699,82", "buying": 2699.82, "buying_str": "2.699,82",
//   "change_amount": -14.431149979896, "change_amount_str": "-14,43", "change_rate": -0.52, "change_rate_str": "%-0,52",
//   "dailyCloseKey": "selling", "decimals": 2,
//   "desktop_url": "https://altin.doviz.com/ceyrek-altin", "fiftytwoweek_high": "2862.6900000000",
//   "fiftytwoweek_high_str": "2.862,69", "fiftytwoweek_low": "1548.9271435000",
//   "fiftytwoweek_low_str": "1.548,93", "full_name": "Çeyrek Altın",
//   "full_name_lowercase": "çeyrek altın", "full_name_uppercase": "ÇEYREK ALTIN",
//   "full_name_without_source": "Çeyrek Altın", "gold": 3, "grand_bazaar": true,
//   "highest": 2774.25, "highest_str": "2.774,25", "id": 2237,
//   "image": { "base": "https://static.doviz.com/images/flags/altin.png" }, "include_in_search_results": true,
//   "info_approved": true, "interday_charts_enabled": true, "intraday_charts_enabled": true,
//   "latest_value": 2760.79, "latest_value_str": "2.760,79",
//   "link": "ceyrek-altin", "live_charts_enabled": false, "lowest": 2759.89,
//   "lowest_str": "2.759,89", "mobile_url": "https://m.doviz.com/altin/ceyrek-altin",
//   "monthly_change_amount": -30.469387473663, "monthly_change_amount_str": "-30,47",
//   "monthly_change_rate": -1.0916, "monthly_change_rate_str": "%-1,09",
//   "monthly_status": "down", "name": "ceyrek-altin", "one_month_high": "2806.2600000000",
//   "one_month_high_date": 1695589200, "one_month_high_str": "2.806,26",
//   "one_month_low": "2760.7900000000", "one_month_low_date": 1695934800, "one_month_low_str": "2.760,79",
//   "open": 2769.94, "open_str": "2.769,94", "portfolioItem": true,
//   "position_in_daily_range": 6.2674094707527, "position_in_fiftytwoweek_range": 92.243653449644,
//   "precedence": 3, "previous_closing": 2775.23, "previous_closing_str": "2.775,23",
//   "related_assets": [[Object], [Object], [Object], [Object], [Object]],
//   "selling": 2760.79, "selling_str": "2.760,79", "short_code": "ceyrek-altin",
//   "short_name": "Çeyrek Altın", "slug": "ceyrek-altin", "source": 99,
//   "source_full_name": "Serbest Piyasa", "source_id": 99, "source_name": "Serbest Piyasa", "source_precedence": 1, "spread": 60.97, "spread_percentage": 2.2582987013949, "spread_percentage_str": "%2,26", "spread_str": "60,97", "status": "down", "symbol": "", "type": "gold", "update_date": 1695996478, "update_date_str": "17:07", "url": "ceyrek-altin", "weekly_change_amount": -43.990172221116, "weekly_change_amount_str": "-43,99", "weekly_change_rate": -1.5684, "weekly_change_rate_str": "%-1,57", "weekly_status": "down", "yearly_change_amount": 1172.2895238739, "yearly_change_amount_str": "1.172,29", "yearly_change_rate": 73.7985, "yearly_change_rate_str": "%73,80", "yearly_status": "up"
// }]