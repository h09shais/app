export interface Request {
  _id: string;
  status: 'pending' | 'accepted' | 'canceled';
  requesterShortName: string;
  acceptorShortName: string;
  requesterProfileId: string;
  acceptorProfileId: string;
  acceptorDistance: number;
  type: 'misc';
  createdAt: string;
  candidates: {
    profileId: string;
    distance: number;
  }[];
  updatedAt: string;
}
