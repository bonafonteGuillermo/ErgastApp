
export default class ApiClient {

  static BASE_URL = 'https://ergast.com/api/f1';

  getDriverStandings = async (year) => {
    let url = `${ApiClient.BASE_URL}/${year}/driverStandings.json`;
    const json = await fetch(url);
    const res = await json.json();
    return res.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  }

  getDriverDetails = async (driverId) => {
    let url = `${ApiClient.BASE_URL}/drivers/${driverId}.json`;
    const json = await fetch(url);
    const res = await json.json();
    return res.MRData.DriverTable.Drivers[0];
  }

}