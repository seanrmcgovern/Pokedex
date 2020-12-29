# Pokedex
This is a Pokedex mobile application that can display data on all 8 generations of Pokemon. The app also allows users to create parties, or designated groups of Pokemon, and add Pokemon to a list of favorites. It was built with React-Native and Expo for deployment/development. Initially <a href="https://firebase.google.com/">Firebase</a> was used for user authentication and database purposes. Now the app uses AsyncStorage, because it seemed a better fit for the use cases. The branch "native-bridge-dev" contains the code from the ejected application, in which I used the <a href="https://reactnative.dev/docs/native-modules-ios">Native Bridge<a> to store and retrieve data into <a href="https://developer.apple.com/documentation/coredata">Core Data<a>. Additionally, data was fetched from <a href="https://pokeapi.co/">PokeAPI<a>. The app works on both Android and iOS, but is designed primarily for iOS. A strong internet connection is recommended.


# Try it out!
<p>Watch the full demo of the current state of the app on my <a href="https://www.youtube.com/watch?v=j3-sw69TbPo&t=3s">YouTube channel</a> </p>

<p>Download the Expo Client App on the <a href="https://itunes.apple.com/app/apple-store/id982107779">App Store</a>, and scan the QR code at https://expo.io/@smcgovern/pokedex with your phone's camera.</p>

## Useful information on each individual Pokemon
<div style="display: flex;">
  <img src="https://i.imgflip.com/4deg40.gif"/>
  <img src="https://i.imgflip.com/4delac.gif"/>
</div>

## Choose between 8 different generations of Pokemon
<div style="display: flex;">
  <img src="https://i.imgflip.com/4deemz.gif"/>
  <img src="https://i.imgflip.com/4def2r.gif"/>
</div>

## User authentication lets you create parties and mark your favorites
<div style="display: flex;">
  <img src="https://i.imgflip.com/4desw6.gif"/>
  <img src="https://i.imgflip.com/4dengr.gif"/>
  <img src="https://i.imgflip.com/4deqbq.gif"/>
</div>

## Scales to iPad or smaller iPhones
<div style="display: flex;">
  <img src="https://i.imgflip.com/4dw7cx.gif"/>
  <img src="https://i.imgflip.com/4dw7qp.gif"/>
</div>
