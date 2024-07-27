import { Component, OnInit } from '@angular/core';
import { Question } from '../util/question.model';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit{
  questions: Question[] = [];

  constructor(private questionService: QuestionService){

  }
  ngOnInit(): void {
    this.loadQuestions();
  }
  loadQuestions(): void {
    this.questionService.getQuestions().subscribe(
      {
        next: (data: any)=>{
          console.log('Question Data');
          this.questions = data
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
}
