import { TextResult } from './models/text-result.model';

export class SearchResults {
    
    constructor(
        private shuffledArr: TextResult[] = [], 
        private unshuffledArr: TextResult[] = [],
        private resultCount: number = 0,
        private elapsedSearchTime: number = 0,
        ) {}
    
    
    public set shuffled(v : TextResult[]) {
        this.shuffledArr = v;
    }

    public set unshuffled(v : TextResult[]) {
        this.unshuffledArr = v;
    }
    
    
    public get unshuffled() : TextResult[] {
        return this.unshuffledArr.slice();
    }
    public get shuffled() : TextResult[] {
        return this.unshuffledArr.slice();
    }
    
    
    public get elapsed() : number {
        return this.elapsedSearchTime;
    }

    public get count() : number {
        return this.resultCount;
    }
    

}