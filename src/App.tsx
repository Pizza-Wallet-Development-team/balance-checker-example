import { Buffer } from 'buffer';
import ConnectAccount from './components/Account/ConnectAccount';
import { Layout } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
// import ChainSelector from './components/ChainSelector';
import TokenList from './components/TokenList/TokenList';

const { Header } = Layout;

const styles = {
  layout: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    fontFamily: 'Sora, sans-serif',
  },
  header: {
    zIndex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 20px',
    paddingTop: '15px',
  },
  headerRight: {
    display: 'flex',
    gap: '10px',
    alignItems: 'right',
    paddingRight: '10px',
    fontSize: '15px',
    fontWeight: '600',
    marginLeft: 'auto',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: '#041836',
    marginTop: '100px',
    padding: '10px',
    overflow: 'auto',
  },
  footer: {
    position: 'fixed',
    textAlign: 'center',
    width: '100%',
    bottom: '0',
    color: 'white',
    backgroundColor: 'transparent',
  },
} as const;

function App() {
  if (!window.Buffer) window.Buffer = Buffer;

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <div style={styles.headerRight}>
          {/* <ChainSelector /> */}
          <ConnectAccount />
        </div>
      </Header>
      <TokenList />
    </Layout>
  );
}

export default App;
