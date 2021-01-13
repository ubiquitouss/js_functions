const poll = {
  question: 'What is your favourite programming language?',
  options: ['0:javascript', '1:python', '2:Rust', '3:c++'],
  answers: new Array(4).fill(0),
  reggisterNewAnswer() {
    const answer = prompt(
      `${this.question}\n${this.options.join('\n')}\n(write option number)`
    );
  },
};
