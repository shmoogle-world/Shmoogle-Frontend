export class TextResult {
    constructor(
        public id: string,
        public name: string,
        public url: string,
        public isFamilyFriendly: boolean,
        public displayUrl: string,
        public snippet: string,
        public dateLastCrawled: string,
        public language: string,
        public isNavigational: boolean,
        public originalResultIndex: number,
    ) {}
}