import dva from 'dva';
import { create } from '@/utils/mysql';
create();
// 1. Initialize
const app = dva();
app.model(require('@/models/index/app.js').default);
app.model(require('@/models/index/ChatRecord.js').default);
app.model(require('@/models/index/MailList.js').default);

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
