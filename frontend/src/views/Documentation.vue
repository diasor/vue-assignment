<template>
  <div class="about-container">
    <div class="divider" />
    <h1>Documentation about this Assignment</h1>
    <div class="divider" />
    <h2>This application was created with <i>Vue 2.6.1</i>, <i>SASS</i> and <i>TypeScript</i>. It also uses a 
    Router with lazy loading and Vuex to handle the state. The general styling was based on the ViriCiti home site.
    The application is responsive.</h2>
    <ul>
      <li>
        Components
        <div class="text-container">
          <p>The implementation is based on four main components:
            <ul>
              <li><b>The Map Component:</b>
                <p>The <i>GoogleMap.vue</i> component was implemented using google maps, particularly the <b>vue2-google-maps</b> library. 
                The map contains 2 types of markers: the current location (marked with a red marker
                <img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png">) and the past positions 
                marked (with a blue icon <img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png">).
                The list of positions is sent as props from the Main Component.</p></li>
              <li><b>The Vehicle Data Component:</b> 
              <p>The <i>VehicleData.vue</i> is a basic component that is constantly showing the vehicle's newest
              information as soon as it is sent by the backend. It receives all the information via props and 
              displays the speed, state of charge, energy and odometer. In order to do so, it uses an external 
              library <b>vuejs-progress-bar</b> to show a progress bar. This library is locally encapsulated on the 
              <i>LocalProgressBar.vue</i> component and used twice on the current component.</p></li>
              <li><b>The Chart Component:</b> 
              <p>The <i>LineChart.vue</i> component was implemented using the <b>D3</b>. Particularly, it prints
              a new line chart. The <i>LineChart.vue</i> is a generic component that receives as parameter the 
              data to be displayed, the x and y axis titles and some other customization data, and it creates 
              the chart. </p></li>
              <li><b> The Vehicle Dashboard Component:</b>
              <p>The <i>VehicleDashboard.vue</i> component is a container that includes the map, the data component 
              as well as the two charts. It looks like this: <img class="main-screen" src="../assets/viricity-screen.png"></p>
              <p>This component also handles the data sent from the backend. Once the connection with the backend is established,
                the backend is constantly sending messages at a high frequency, so it is not perfomant to re-render every
                component for each single message.</p>
                <p>So for each message sent, the <i>VehicleData.vue</i> component shows everything shown as soon as it comes.
                However, the rest of the components are not reloaded inmediately. Instead, the <i>Vehicle.vue</i> uses a 
                timer to reload all the data for each of the visual components every 5 seconds. So every 5 seconds, the 
                map and the two charts are re-loaded and shown with the information stored.</p></li>
            </ul>
          </p>
        </div>
      </li>
      <li>WebSockets and State: 
        <p>The backend uses a websocket to broadcast the vehicle related messages. The frontend uses the browser native
          <i>WebSocket API</i> to connect to the backend and listen to those messages. Once the <i>Home.vue</i>
          component is created, it attempts to connect to the backend. In case it connects correctly it logs a message and 
          it logs an error if it fails.
        </p>
        <p>Once the connection was successfully established, the application listens to every message sent. For every message
          received, the application creates a new instance of a message with a particular type and adds it to the state.
        </p>
        <p>The application keeps two main structures on the State: 
          <ul>
            <li>An array with the last 50 messages: Every time a message is received, if the application has less than
              50 messages stored, then it adds it to the array. If there are already 50 messages, the system drops the 
              oldest message and stores the new one. This is the structure used to show on the visual components (namely
              the Map and both Charts).
            </li>
            <li>The information of the Current Vehicle Data: This basically stores the information of the last message
              stored.
            </li>
          </ul>
        </p>
      </li>
      <li>
        Libraries
        <div class="text-container">
          <p>
            The assignment's implementation includes the use of several libraries:
          </p>
          <ul>
            <li><i>vuejs-progress-bar</i>: This library is used to integrate a progress bar component.</li>
            <li><i>d3</i> and <i>d3-time-format</i>: These libraries are used to create the charts.</li>
            <li><i>vue2-google-maps</i>: This library is used to show the map with the markers showing the gps information.</li>
            <li><i>vue-router</i>: Used to route the two pages the application allows (Vehicle Dashboard and Documentation).
            It is worth mentioning that the application uses lazy loading. </li>
            <li><i>vuex</i>: This is used to handle the application state, mutation and actions.</li>
            <li><i>vue-class-component</i> and <i>vuex-class</i>: These libraries are used to handle decorators for 
            the proper use of TypeScript and Namespaces of the state. </li>
            <li><i>lodash</i>: This is used for auxiliary array functions.</li>
            <li><i>moment</i>: This is used to parse the date timestamps.</li>
          </ul>
        </div>
      </li>
      <li>
        Styles
        <div class="text-container">
          <p>
            The assignment's design system was based on the <a href="www.viricity.com">ViriCiti.com</a> real 
            home page. This includes the same fonts (Montserrat),the color palette, the logo, the bullets, the the top 
            green bar and the navigation menu.
          </p>
          <p>The application uses SASS and scoped styles. It contains a file for general variable declarations that are 
            used all over the application called <i>variables.scss</i>.
          </p>
          <p>The application is responsive. Here are some view examples in different sizes: </p>
            <p><img class="devices" src="../assets/viricity-iphone.png">
            <img class="devices" src="../assets/viricity-ipad.png">
            <img class="devices" src="../assets/viricity-ipad-2.png">
          </p>
        </div>
      </li>
    </ul>
        <div class="divider" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/variables';

.about-container {
  height: 100%;
  margin: 0;
  padding: 0.2rem 0;
  background-color: white;

  > h1 {
    font-size: 30px;
    font-weight: bold;
  }

  > h2 {
    padding: 0 2rem;
    font-size: 20px;
    font-weight: normal;
    text-align: left;
  }

  > ul {
    text-align: left;
  }
  > ul li:before {
    content: '✓';
    font-weight: bold;
    color: #7ca363 !important;
    padding: 5px;
  }
  > ul,
  li {
    margin: 0.5rem 0 0 0;
    font-size: 20px;
    font-weight: normal;
    list-style-type: none;
  }
}

.text-container {
  margin: 0 1rem;
  padding: 0;

  & ul {
    text-align: left;
  }
  & ul li:before {
    content: '\2022';
    font-weight: bolder;
    color: #7ca363 !important;
    padding: 5px;
  }
  & ul,
  li {
    margin: 0.5rem 0 0 0;
    font-size: 20px;
    font-weight: normal;
    list-style-type: none;
  }

  & p {
    font-size: 18px;
    font-weight: normal;
    color: black ;
    text-align: left;
  }
}

.divider {
  margin: 0;
  height: 2px;
  background-color: $light-green;
}

.main-screen {
  margin: 1rem auto;
  width: 98%;
  border-radius: 0.5rem;
}

.devices {
  margin: 1rem auto;
  width: auto;
  max-width: 550px;
  border-radius: 0.5rem;
}
</style>
