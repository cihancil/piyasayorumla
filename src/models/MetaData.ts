type MetaData = {
  key: string,
  type: DataType,
  fullName: string,
  name: string,
  source?: string,
  image?: string,
}
export default MetaData

export const enum DataType {
  CUR = 'CUR',
  IND = 'IND',
  FON = 'FON',
  FUEL = 'FUEL',
  TAHVIL = 'TAHVIL',
  STOCK = 'STOCK',
  TOKEN = 'TOKEN',
  Z = 'Z',
  PARITE = 'PARITE',
  GOLD = 'GOLD',
  X = 'X',
  EMTIA = 'EMTIA',
}