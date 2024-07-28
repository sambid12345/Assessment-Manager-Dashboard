import { Component } from '@angular/core';
import { Question } from '../util/question.model';
import { QuestionService } from '../question.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent {
  question?: Question;
  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadQuestionDetails(id);
      }
    });
  }

  loadQuestionDetails(id: string): void {
    this.questionService.getQuestionById(id).subscribe({
      next: (question: Question)=>{
        this.question = question
      },
      error: (error: any)=>{console.error('Error fetching question details', error)}
    });
  }

  onEdit(): void {
    if (this.question) {
      this.router.navigate(['/questions/edit', this.question._id]);
    }
  }

  onDelete(): void {
    if (this.question && confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(this.question._id).subscribe({
        next: ()=>{this.router.navigate(['/questions'])},
        error: (error: any)=>{console.error('Error deleting question', error)}
      })
    }
  }
}
