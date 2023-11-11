export interface BaseType {
  key?: string
  name: string
  icon?: any
  path?: string
  openKey?: string
}
export interface MenuType extends BaseType {
  children?: BaseType[]
}
