
export class ImageResult {
    
    webSearchUrl: string;
    name: string;
    thumbnailUrl: string;
    datePublished: string | Date;
    isFamilyFriendly: boolean;
    contentUrl: string;
    hostPageUrl: string;
    contentSize: string;
    encodingFormat: string;
    hostPageDisplayUrl: string;
    width: number;
    height: number;
    hostPageFavIconUrl: string;
    hostPageDomainFriendlyName: string;
    thumbnail: {
        width: number, 
        height: number
    };
    
    imageInsightsToken: string;
    insightsMetaData: {
        recipeSourcesCount: number,
        pagesIncludingCount: number,
        availableSizesCount: number,
    };

    imageId: string;
    accentColor: string;
    originalResultIndex: number;
   
}