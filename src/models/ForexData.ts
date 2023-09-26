type ForexData = {
  name: string
  type: DataType
  fullName?: string
  alis?: string
  satis?: string
  degisim?: string
  endpoint: string
  son?: string
}
export default ForexData

export const enum DataType {
  'kur',
  'gold',
  'borsa'
}