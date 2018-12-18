import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {BookSearchComponent} from "./book-search.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookSearchComponent', () => {
    let component: BookSearchComponent;
    let fixture: ComponentFixture<BookSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BookSearchComponent ],
            imports: [BookSearchComponent.withRoutes([]), HttpClientTestingModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
