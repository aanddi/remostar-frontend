interface IContractorCard {
  id: number;
  name: string;
  budget: number;
  adress: string;
  desc: string;
  gallery: {
    key: number;
    src: string;
  }[];
  tags: {
    id: number;
    name: string;
  }[];
  user: {
    name: string;
    verify: boolean;
    type: string;
  };
}

interface IAnnouncementCardProps {
  data: IContractorCard;
}

export default IAnnouncementCardProps;
