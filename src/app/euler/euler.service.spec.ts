import {TestBed, inject} from "@angular/core/testing";
import {EulerService} from "./euler.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Euler001Response} from "./euler001response";

describe('EulerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                EulerService
            ],
            imports: [
                HttpClientTestingModule
            ],
        });
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));

    it('should be created', inject([EulerService], (service: EulerService) => {
        expect(service).toBeTruthy();
    }));

    it('should do a POST request to the Euler001 API',
        inject([HttpTestingController, EulerService],
            (httpMock: HttpTestingController, service: EulerService) => {

            let reqBody = { multiple1: 3, multiple2: 5, limit: 100 };

            // We call the service
            service.getEuler001(reqBody).subscribe();

            // We set the expectations for the HttpClient mock
            const req = httpMock.expectOne('http://localhost:8080/EulerWebService/api/euler/1');
            expect(req.request.method).toEqual('POST');

        })
    );

    it('should return a proper json euler001response body',
        inject([HttpTestingController, EulerService],
            (httpMock: HttpTestingController, service: EulerService) => {

                // Set the request body for the call
                let reqBody = { multiple1: 3, multiple2: 5, limit: 100 };

                // We call the service using this request body
                service.getEuler001(reqBody).subscribe((data: Euler001Response) => {
                    console.log(data);
                    expect(data.sum).toBe(123456789);
                    expect(data.multiple1).toBe(987);
                    expect(data.multiple2).toBe(654);
                    expect(data.limit).toBe(321);
                });

                // We set the expectations for the HttpClient mock
                const req = httpMock.expectOne('http://localhost:8080/EulerWebService/api/euler/1');
                expect(req.request.method).toEqual('POST');
                expect(req.request.responseType).toEqual('json');
                expect(req.request.body).toEqual(reqBody);

                // Then we set the fake data to be returned by the mock
                req.flush({ multiple1: 987, multiple2: 654, limit: 321, sum: 123456789});

            })
    );
});
