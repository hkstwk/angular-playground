import {TestBed} from "@angular/core/testing";
import {EulerService} from "./euler.service";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('EulerService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            EulerService,
            HttpClient,
            HttpHandler],
    }));

    it('should be created', () => {
        const service: EulerService = TestBed.get(EulerService);
        expect(service).toBeTruthy();
    });
});
