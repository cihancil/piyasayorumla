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

export const getMetaDataType = (t: string) => {
  switch (t) {
    case 'C':
      return 'CUR'
    case 'I':
      return 'IND'
    case 'F':
      return 'FON'
    case 'FU':
      return 'FUEL'
    case 'B':
      return 'TAHVIL'
    case 'S':
      return 'STOCK'
    case 'D':
      return 'TOKEN'
    case 'Z':
      return 'Z'
    case 'P':
      return 'PARITE'
    case 'G':
      return 'GOLD'
    case 'X':
      return 'X'
    case 'E':
      return 'EMTIA'
  }
}