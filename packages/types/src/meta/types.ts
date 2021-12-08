export enum DocType {
  Book = 'book',
  Ancient = 'ancient',
  Magazine = 'magazine'
}

export enum MetaType {
  Doc = 'Doc',
  Structure = 'Structure',
  Pic = 'Pic',
  Person = 'Person',
  Org = 'Org',
  Event = 'Event',
  Geo = 'Geo',
  Product = 'Product',
  Obj = 'Obj'
}

export const MetaTypeToFileNameMap: Record<MetaType, string> = {
  [MetaType.Doc]: '基础',
  [MetaType.Structure]: '结构',
  [MetaType.Pic]: '图表',
  [MetaType.Person]: '人物',
  [MetaType.Org]: '机构',
  [MetaType.Event]: '事件',
  [MetaType.Geo]: '地理',
  [MetaType.Product]: '专题',
  [MetaType.Obj]: '实物'
}
