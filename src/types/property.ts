export interface PropertyInfo {
  Id: string;
  Name?: string;
  Description?: string;
  MediaUrls: string[];
  Address?: string;
  Price?: string;
  UpvoteUsers: string[];
  InterestCount?: string;
  IsPublished: boolean;
  UserId: string;
  PublishDateTime: string;
  CreatedDate: string;
  LastModifiedDate: string;
}

export type Property = PropertyInfo;