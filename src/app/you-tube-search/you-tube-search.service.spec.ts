import {TestBed, async} from "@angular/core/testing";
import {YouTubeSearchService} from "./you-tube-search.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {youTubeSearcInjectables} from "./you-tube-search.injectables";
import {of, Observable} from "rxjs";
import {SearchResult} from "../model/search-result.model";

describe('YouTubeSearchService', () => {

    let service: YouTubeSearchService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                YouTubeSearchService,
                youTubeSearcInjectables,
                HttpClient,
                HttpHandler],
        });

        service = TestBed.get(YouTubeSearchService);
    }));

    it('should create the YouTubeSearchService', () => {
        expect(service).toBeTruthy();
    });

    it('should return a mocked collection of search results', () => {
        const searchResponse = [
            {
                id: "1 - video id",
                title: "video title",
                description: "video description",
                thumbnailUrl: "https://i.ytimg.com/vi/3kZfgpnI__s/hqdefault.jpg",
                videoUrl: "https://www.youtube.com/watch?v=3kZfgpnI__s"
            },
            {
                id: "2 - CHdN82aOkTo",
                title: "The Worlds Best Epic MTB Rides That Will Blow Your Mind",
                description: "Epic mountain bike rides are one of the reasons we love the sport, and whilst we might not all share the same definition of an epic ride, we can all agree that ...",
                thumbnailUrl: "https://i.ytimg.com/vi/CHdN82aOkTo/hqdefault.jpg",
                videoUrl: "https://www.youtube.com/watch?v=CHdN82aOkTo"
            },
            {
                id: "3 - u8adwRcSYB0",
                title: "Blake Does A Hardtail Enduro Race",
                description: "Hardtail mountain bikes, they're a lot of fun. Nobody loves theirs more than Blake, he's proved they can shred in Whistler, so it was only natural that he entered a ...",
                thumbnailUrl: "https://i.ytimg.com/vi/u8adwRcSYB0/hqdefault.jpg",
                videoUrl: "https://www.youtube.com/watch?v=u8adwRcSYB0"
            }
        ];
        let response: Observable<SearchResult[]>;
        spyOn(service, 'search').and.returnValue(of(searchResponse));

        service.search('aap noot mies').subscribe(res => {
            response = res;
        });

        expect(response).toEqual(searchResponse);
        expect(service.search).toHaveBeenCalledWith('aap noot mies');
    });

});
