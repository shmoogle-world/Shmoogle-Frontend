import { ImageResult } from './models/image-result.model';
import { TextResult } from './models/text-result.model';

export class SearchResults {
    
    constructor(
        private shuffledArr: TextResult[] | ImageResult[] = [], 
        private unshuffledArr: TextResult[] | ImageResult[] = [],
        private resultCount: number = 0,
        private elapsedSearchTime: number = 0,
        ) {}
    
    
    public set shuffled(v : TextResult[] | ImageResult[]) {
        this.shuffledArr = v;
    }

    public set unshuffled(v : TextResult[] | ImageResult[]) {
        this.unshuffledArr = v;
    }
    
    
    public get unshuffled() : TextResult[] | ImageResult[] {
        return this.unshuffledArr.slice();
    }
    public get shuffled() : TextResult[] | ImageResult[] {
        return this.shuffledArr.slice();
    }
    
    
    public get elapsed() : number {
        return this.elapsedSearchTime;
    }

    public get count() : number {
        return this.resultCount;
    }
    

}