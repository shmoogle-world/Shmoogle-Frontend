import { SearchResult } from './search-result.model';

export class SearchResults {
    
    constructor(
        private shuffledArr: SearchResult[] = [], 
        private unshuffledArr: SearchResult[] = [],
        private resultCount: number = 0,
        private elapsedSearchTime: number = 0,
        ) {}
    
    
    public set shuffled(v : SearchResult[]) {
        this.shuffledArr = v;
    }

    public set unshuffled(v : SearchResult[]) {
        this.unshuffledArr = v;
    }
    
    
    public get unshuffled() : SearchResult[] {
        return this.unshuffledArr.slice();
    }
    public get shuffled() : SearchResult[] {
        return this.unshuffledArr.slice();
    }
    
    
    public get elapsed() : number {
        return this.elapsedSearchTime;
    }

    public get count() : number {
        return this.resultCount;
    }
    

}