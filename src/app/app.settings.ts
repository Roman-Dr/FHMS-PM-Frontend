export class AppSettings {
  //public static API_ENDPOINT = 'http://10.60.67.20:3000/';
  public static API_ENDPOINT = 'http://localhost:3000/';

  constructor() {

  }

  public static getProjectUrl(): string {
    return AppSettings.API_ENDPOINT + 'api/projects/' + sessionStorage.getItem('project_id');
  }
}
