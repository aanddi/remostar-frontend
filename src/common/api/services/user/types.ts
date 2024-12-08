interface IUserProfile {
  id: string;
  createdAt: string;
  updateAt: string;
  name: string;
  surname: string;
  patronymic: string;
  gender: string;
  birthday: string;
  pathImage: string;
  email: string;
  phone: string;
}

interface IEditUserProfile {
  name: string;
  surname: string;
  patronymic: string;
  gender: string;
  email: string;
}

export type { IUserProfile, IEditUserProfile };
