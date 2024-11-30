import { Component, EventEmitter, Output } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CoursesService } from '../../../core/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preview-courses',
  standalone: true,
  imports: [AccordionModule, ButtonModule  ],
  templateUrl: './preview-courses.component.html',
  styleUrl: './preview-courses.component.css'
})
export class PreviewCoursesComponent {

  sections = [
    {
      title: 'Introduction to UI/UX Design',
      isOpen: true,
      links: [
        { label: 'Understanding UI vs UX', comingSoon: false },
        { label: 'Importance of UI/UX Design', comingSoon: false },
        { label: 'Role of UI/UX Designer', comingSoon: false }
      ]
    },
    {
      title: 'User Research',
      isOpen: false,
      links: [
        { label: 'User Interviews', comingSoon: true },
        { label: 'Persona Development', comingSoon: true },
        { label: 'User Surveys', comingSoon: true }
      ]
    }
  ];

  @Output() backButton = new EventEmitter<any>()


  activeSectionIndex = 0; // Index of the active section
  activeLinkIndex = 0; // Index of the active link in the active section
  courseId : any;
  subjectAndLessionData : any;
  chapterDataList : any;
  lessonId : any


  constructor(private _coursesService : CoursesService, private route : ActivatedRoute, private _router : Router){
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
    });

  }

  ngOnInit(){
    this.getChapterAndSubject()

  }

  getChapterAndSubject(){
    this._coursesService.getCourseChapterAndSubject(this.courseId).subscribe(res => {
      this.subjectAndLessionData = res.course.lectures_section;
      console.log(res.course.lectures_section)
    })
  }

  


  toggleTab(sectionIndex: number) {
    this.sections[sectionIndex].isOpen = !this.sections[sectionIndex].isOpen;
  }

  // Set the active link manually
  setActiveLink(sectionIndex: number, linkIndex: number, lession : any) {
    this.lessonId = lession.id;
    this.activeSectionIndex = sectionIndex;
    this.activeLinkIndex = linkIndex;
    this.getChapterContent()
  }

  getChapterContent() {
    this._coursesService.getChapterContentList(this.courseId, this.lessonId).subscribe(res => {
      this.chapterDataList = res.data
    })
  }

  // Move to the next link
  goToNext() {
    const section = this.sections[this.activeSectionIndex];
    if (this.activeLinkIndex < section.links.length - 1) {
      this.activeLinkIndex++;
    } else if (this.activeSectionIndex < this.sections.length - 1) {
      // Move to the next section if available
      this.activeSectionIndex++;
      this.activeLinkIndex = 0;
    }
  }

  // Move to the previous link
  goToPrevious() {
    if (this.activeLinkIndex > 0) {
      this.activeLinkIndex--;
    } else if (this.activeSectionIndex > 0) {
      // Move to the previous section if available
      this.activeSectionIndex--;
      this.activeLinkIndex = this.sections[this.activeSectionIndex].links.length - 1;
    }
  }

  // Get the currently active link
  get activeLink() {
    return this.sections[this.activeSectionIndex].links[this.activeLinkIndex];
  }


  backToBulderPage(){
    this._router.navigate(['/course/content', this.courseId])

  }

}
