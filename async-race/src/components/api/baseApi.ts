export default abstract class BaseApi {
  generateQueryParam(queryParam: { key: string; value: string }[]) {
    return queryParam.length ? `?${queryParam.map((item) => `${item.key}=${item.value}`).join('&')}` : '';
  }
}
