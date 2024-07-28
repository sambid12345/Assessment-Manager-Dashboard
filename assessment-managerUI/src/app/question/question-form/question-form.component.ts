import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../util/question.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit{
  questionForm!: FormGroup;
  isEditMode: boolean = false;
  questionId?: string;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ){

  }
  ngOnInit(): void {
      this.initiateQuestionForm();
      this.initializeOptions();

      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.questionId = id;
          this.loadQuestionData(id);
        }
      });
  }
  initiateQuestionForm(){
    this.questionForm = this.fb.group({
      questionText: ['question text', Validators.required],
      options: this.fb.array([]),
      correctOption: [2, Validators.required],
      marks: [4, [Validators.required, Validators.min(0)]],
      negativeMarks: [1],
      tags: ['demo tag']
    });
  }

  initializeOptions(): void {
    const optionsArray = this.questionForm.get('options') as FormArray;
    for (let i = 0; i < 4; i++) {
      optionsArray.push(this.fb.group({ text: ['', Validators.required] }));
    }
  }
  get options() {
    return this.questionForm.get('options') as FormArray;
  }
  loadQuestionData(id: string): void {
    this.questionService.getQuestionById(id).subscribe(
      {
        next: (question: Question)=>{
            this.questionForm.patchValue({
              questionText: question.text,
              correctOption: question.correctOption,
              marks: question.marks,
              negativeMarks: question.negativeMarks,
              tags: question.tags.join(', '),
            });
            this.questionForm.setControl(
              'options',
              this.fb.array(
                question.options.map((option) =>
                  this.fb.group({ text: option })
                )
              )
            );
        },
        error: (error: any)=>{console.error('Error loading question data', error)}
      }
    );
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const formValue = this.questionForm.value;
      console.log('question form value', formValue);
      const questionData: Question = {
        text: formValue.questionText,
        options: formValue.options.map((option: any) => option.text),
        correctOption: formValue.correctOption,
        marks: formValue.marks,
        negativeMarks: formValue.negativeMarks,
        tags: formValue.tags.split(',').map((tag: string) => tag.trim())
      };
      console.log('formatted question data', questionData);
      if (this.isEditMode && this.questionId) {
        this.questionService.updateQuestion(this.questionId, questionData).subscribe({
          next: (response: any)=>{this.router.navigate(['/questions'])},
          error: (error: any)=>{console.error('Error updating question', error)}
        });
      } else {
        this.questionService.createQuestion(questionData).subscribe({
          next: (response: any)=>{this.router.navigate(['/questions'])},
          error: (error: any)=>{console.error('Error creating question', error)}
        });
      }
    }
  }
  logout(): void {
    if(confirm('Are you sure you want to delete this question?')){
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }
}
