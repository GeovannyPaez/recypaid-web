
export interface PickerEntity {
  id: string
  profile: ProfileEntity
  statusReason: string
  userId:string
  status: string
  vehicles?: Vehicle[]
  createdAt: string
  updatedAt: string
}

export interface ProfileEntity {
  name: string
  lastname: string
  createdAt: string
  pictureUrl: string
  documents: UserDocument[]
}



export interface UserDocument {
  approved: boolean
  id: string
  typeId: string
  userId: string
  type: Type
  document: Document
}

export interface Type {
  order: number
  id: string
  label: string
  role: string
  name: string
}

export interface Document {
  id: string
  url: string
  originalName: string
}

export interface Vehicle {
  id: string
  type: string
  description?: string
  createdAt: string
  updatedAt: string
  pickerId: string
  isSelected: boolean
}
