export interface IProducts {
    "id": number,
    "title": string,
    "price": number,
    "image"?: string,
    "quantity": number,
    "details": IProductsDetails;

}

export interface IProductsDetails {
  "description": string,
      "features":string[],
      "volume"?: number,
      "amount": number,
      "affiliation_id": number
}
