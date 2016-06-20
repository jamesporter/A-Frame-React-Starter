#A-Frame React Starter

Create data visualisations in VR/3D with A-Frame + React

[Demo](http://amimetic.co.uk/vr-viz.html) 

### Getting Started

To get started:

```bash
npm install
npm run serve-js
```

Now open [this](http://localhost:5555)

To use on iPhone/Android device with Google Cardboard (assuming you are on same wifi network). Get ip address, e.g.:

```
ifconfig | grep netmask
```

And type that address in Safari etc:

```
192.168.0.5:8080
```

Put your phone into Google Cardboard and behold non-trivial, interactive, data-viz VR, in about 100 lines of code (which I'm sure could be tidied up a lot).

### What is this?

A little proof of concept: could interactive data visualisation be done efficiently in Recat + A-Frame. The answer appears to be yes.