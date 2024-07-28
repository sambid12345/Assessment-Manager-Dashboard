import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from '../util/question.model';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit{
  questions: Question[] = [];

  displayedColumns: string[] = ['action','updatedAt', 'text', 'tags', 'createdAt'];
  dataSource : any

  constructor(private questionService: QuestionService, private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ){

  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.loadQuestions();
  }
  loadQuestions(): void {
    this.questionService.getQuestions().subscribe(
      {
        next: (data: any)=>{
          console.log('Question Data');
          this.questions = data;
          let modifiedDataSource = this.questions.map((question: any)=>{
            question.action = '';
            return question;
          })
          console.log('modified question list', modifiedDataSource);
          this.dataSource = new MatTableDataSource(modifiedDataSource);
          console.log('data source', this.dataSource);
          this.dataSource.sort = this.sort;

        },
        error: (error: any)=>{
          console.error('Error fetching questions', error)
        }
      }
    );
  }

  deleteQuestion(id: string|undefined): void {
    // this.questionService.deleteQuestion(id).subscribe(
    //   () => this.loadQuestions(),
    //   error => console.error('Error deleting question', error)
    // );
  }
  navigateTo(path:string){
    this.router.navigate([path]);
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
