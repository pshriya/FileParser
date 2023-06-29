import { Component } from '@angular/core';

interface User {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'swagger-form',
  templateUrl: './swagger-form.component.html',
})
export class SwaggerFormComponent {
  url = '';
  requestBody = '';
  header = '';
  requiredParameter = '';
  onSubmit(formValue) {
    console.log(formValue);
  }
  fileOutput;

  onChange(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    let jsonObj = {};
    // reader.onload = (e: any) => {
    //   // The file's text will be printed here
    //   this.fileOutput = e.target.result;
    // };
    reader.onload = () => {
      //console.log(fileReader.result.toString());
      jsonObj = JSON.parse(reader.result.toString());
      this.url = jsonObj['servers'][0].url;
      this.requestBody = JSON.stringify(jsonObj['components'].schemas);
      this.header = jsonObj['X-Request-ID'];
      this.requiredParameter = jsonObj['api-id'];
    };

    reader.readAsText(file);
  }
}
