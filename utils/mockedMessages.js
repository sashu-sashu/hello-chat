
export const initialMessages = [
    {
      _id: '1',
      text: 'Hi Sasha, i hope you are fine today',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Can you please send me the pictures of yesterday?',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: '2',
      text: 'Yes, I am doing fine',
      createdAt: new Date(),
      user: {
        _id: '1',
      },
    },
    {
      _id: 3,
      text: 'Could you please send me the pictures you took at the museum?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },  
    {
      _id: '4',
      text: 'I am busy now finishing my chat app. maybe later.',
      createdAt: new Date(),
      user: {
        _id: '1',
      },
    },
    {
      _id: '5',
      text: 'Sure, take your timne.',
      createdAt: new Date(),
      user: {
        _id: '1',
      },
    },  
  ];