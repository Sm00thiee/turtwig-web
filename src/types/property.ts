export interface PropertyInfo {
  Id: string;
  Name?: string;
  Description?: string;
  MediaUrls: string[];
  Address?: string;
  Price?: string;
  UpvoteCount?: string;
  InterestCount?: string;
  IsPublished: boolean;
  PublishDateTime: string;
  CreatedDate: string;
  LastModifiedDate: string;
}

export type Property = PropertyInfo;