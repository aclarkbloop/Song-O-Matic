import React, { Component } from 'react';

class PetFinder extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        info: "",
        type: this.props.type
      };
    }
    

    componentDidMount() {
      console.log("in mount");
      const info = 
      {method: "GET",
        headers: {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsbjVYVVAyclJqOXV0UjF5em9TOEJmYkF3QWYxTDdKZzlUV1dCOW5jRVVJeHhObTRqVyIsImp0aSI6IjM1NGExMzFjNDc2MmNiOWRiNzdjNTZhNDNlODg0YWU5NTQ4MDMxYzI1NjA4YjJjYjRlNWM2M2U3MTA2ZWQyODkxOGYwZjgyNDViYzQ4MWRjIiwiaWF0IjoxNjIwMzk3Mjg3LCJuYmYiOjE2MjAzOTcyODcsImV4cCI6MTYyMDQwMDg4Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.Qu6Qnj6v_GUEkDpbB5qai58zhlMEw8018tRUCptVG8UfpMOjytSNC1Mf4Yp8C_kBGhENhEhlsZlnZ1JWarV6OoGpj7Qbe2g2t9hNCSYxbEdX5-VyobBJ4zz8wV2IN0LnUMYDGXpXvxv6OVgG_QtDoStHK_kKFetye-nekS3zc1RT0iKOA5F-u5KS7QDR9OEqdlrPybmOsQnwS4bswl8wX8r5LgKzzxlzsPDFzNz7OXYsxx8x9vcNQPMh3PkIQayIytODhuT2oDIoYF2s74DjlQ5daxA9d6OfC4Mvn86r3Aso1d7x_MyjHtrE6WueQ2DEOrM-0Ch24gDm_hpaAdJoeA"
        }}
      var url = "https://api.petfinder.com/v2/animals?type=" + this.state.type + "&page=1";
      fetch(url, info)
      .then(res => res.json()) 
      .then(data => this.setState({
        isLoaded: true,
        info: data.animals
       }))
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  
    render() {
      const { error, isLoaded, info} = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        console.log(info);
        return (
          <div className="petFinder">
            <h1>PetFinder</h1>
            <h2>Find adoptable pets.</h2>
            <ul>
                  {info.map(pet => (
              <div className="pet" key={pet.id}>
                <h3>Name: {pet.name}</h3>
                <p>Contact: {pet.contact.email}</p>
                <p>Breed: {pet.breeds.primary}</p>
                {pet.photos.length > 0 ? <img src={pet.photos[0].medium}/> : <p>No photo available.</p>}
                <div><a href={pet.url}>Click to learn more</a></div>
              </div>
                  ))}
              </ul>
          </div>
        );
      }
    }
  }

export default PetFinder;