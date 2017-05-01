# Google Maps Location Finder
This project outlines a process I'm working on for finding locations within the current bounds of a Google Maps instance[^1].

This is being done on the client-side, but should be applicable server-side as well.

The problem I'm attempting to solve here is as follows:
- You have a database of locations that will be displayed on the map.
- The user will drag the map around, ultimately coming across a number of these locations that are displayed on the map as a marker.
- As new markers are brought into view, we want to update a list of said locations.

As far as I can tell from my research, it is not possible to request from Google Maps something like "return to me all location markers within the current bounds of the map". Instead we're left having to compare our entire list of locations against the current bounds.

Rather than searching through the entire list of locations to find which are within bounds[^2], I'm working on an algorithm for more efficiently assessing this problem. Hopefully one that doesn't result in a time complexity of `O(n)`, as the current solution does.


[^1]: I've been learning React.js recently and that's why it's written as such, I will be placing a demo on my personal website for demoing purposes so that you don't have to build it yourself.
[^2]: Computing this is done in `O(1)`