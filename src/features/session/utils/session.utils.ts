import sessionDetailsMock from '../mocks/session-details.mock';

const getSessionDetails = (sessionId: string) => sessionDetailsMock.find(session => session.id === Number(sessionId));

export default { getSessionDetails };
