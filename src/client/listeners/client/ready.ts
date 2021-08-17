import Listener from "#structures/Listener";

export default class ReadyListener extends Listener {
  public async exec() {
    this.client.user.setPresence({
      activities: [{
        name: '/help',
        type: 'PLAYING',
      }],
    });

    return console.log('LIGOU PORRA');
  }
}
