const getSuggestedTags = (sentiment, entities) => {
const suggestedTags = [];

const entitySuffixes = {
  organizations: {
    positive: ['4Life', 'Forever'],
    negative: ['Sucks']
  },
  people: {
    positive: ['IsMyHero'],
    negative: ['Sad']
  },
  places: {
    positive: ['IsHome'],
    negative: ['IsHell']
  },
};

const sentimentTags = {
  positive: ['#Yay', '#CantWait', '#Excited'],
  negative: ['#Sucks', '#Fail', '#Ugh'],
  mixed: ['#Meh', '#Conflicted'],
};

// Start by grabbing any sentiment tags.
  let emotion;
  if (sentiment.score > 0.1) {
    emotion = 'positive';
  } else if (sentiment.score < -0.1) {
    emotion = 'negative';
  } else if (sentiment.magnitude > 0.1) {
    emotion = 'mixed';
  } else {
    emotion = 'neutral';
  }

// Add a random tag to the list of suggestions.
  let choices = sentimentTags[emotion];
  if (choices) {
    suggestedTags.push(choices[Math.floor(Math.random() * choices.length)]);
  }

// Now run through all the entities and attach some suffixes.
  for (let category in entities) {
    let suffixes;
    try {
      suffixes = entitySuffixes[category][emotion];
    } catch (e) {
      suffixes = [];
    }
    if (suffixes.length) {
      entities[category].forEach((entity) => {
        let suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        suggestedTags.push('#' + entity.name + suffix);
      });
    }
  }

// Return all of the suggested tags.
  return suggestedTags;
};