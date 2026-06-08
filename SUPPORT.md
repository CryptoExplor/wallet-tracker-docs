# Support

## Getting Help with Wallet Balance Tracker

Thank you for using the Wallet Balance Tracker Google Sheets Add-on! This page provides resources to help you get started and troubleshoot common issues.

## Quick Start Guide

### Installation

1. Open a Google Sheet
2. Go to **Extensions > Add-ons > Get add-ons**
3. Search for "Wallet Balance Tracker"
4. Click **Install**
5. Grant the necessary permissions

### Basic Usage

1. Open your Google Sheet
2. Go to **Extensions > Wallet Balance Tracker**
3. Configure your RPC endpoints for the blockchains you want to track
4. Enter wallet addresses in your sheet
5. The add-on will fetch and display balance information

## Common Issues

### Issue: "Cannot connect to RPC endpoint"

**Solution:**
- Verify your RPC endpoint URL is correct
- Check that the RPC provider service is online
- Try using a different RPC provider (e.g., Infura, Alchemy, QuickNode)
- Ensure your RPC endpoint supports the chain you're querying

### Issue: "Balance not updating"

**Solution:**
- Click the refresh button to manually update balances
- Check that your wallet address is correctly formatted (0x...)
- Verify the wallet exists on the blockchain you're querying
- Some RPC providers have rate limits - wait a moment and try again

### Issue: "Incorrect balance displayed"

**Solution:**
- Always verify balances independently using a blockchain explorer
- Check that you're querying the correct network (mainnet vs testnet)
- RPC nodes may be out of sync - try a different provider
- Ensure you're using the correct token contract address if querying token balances

### Issue: "Permission denied errors"

**Solution:**
- Revoke and re-grant permissions: **Extensions > Wallet Balance Tracker > Settings > Permissions**
- Make sure you've granted spreadsheet read/write permissions
- Sign out and sign back into your Google account

## Frequently Asked Questions

### Is my data stored on your servers?

No. The Add-on operates entirely within your Google Sheets environment. We do not collect, store, or transmit your wallet addresses or balance data to any servers we control.

### Which blockchains are supported?

The Add-on supports all EVM-compatible blockchains, including:
- Ethereum
- Polygon
- Binance Smart Chain
- Avalanche
- Arbitrum
- Optimism
- And many more

You just need to configure the correct RPC endpoint for your desired chain.

### Can I track multiple wallets?

Yes! You can add as many wallet addresses as you need in your spreadsheet.

### Is this Add-on free?

Yes, the Wallet Balance Tracker Add-on is completely free to use.

### Do I need my private keys?

No! **Never** share or enter your private keys. The Add-on only needs your public wallet addresses to query balance information.

### Can I track token balances?

Yes, the Add-on can track both native coin balances (ETH, MATIC, BNB, etc.) and ERC-20 token balances.

## Reporting Issues

If you encounter a bug or have a feature request:

### GitHub Issues

Please open an issue on our GitHub repository:
- **Repository**: https://github.com/antigravitylabs/wallet-tracker-docs
- **Open an Issue**: https://github.com/antigravitylabs/wallet-tracker-docs/issues/new

When reporting an issue, please include:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Error messages (if any)

### Email Support

For general questions or support:
- **Email**: ravikumar699121@gmail.com
- **Response Time**: We aim to respond within 2-3 business days

## Feature Requests

We welcome feature requests! Please submit them via:
- **GitHub Issues**: https://github.com/antigravitylabs/wallet-tracker-docs/issues
- **Email**: ravikumar699121@gmail.com

## Privacy & Security

For information about how we handle your data:
- **Privacy Policy**: https://github.com/antigravitylabs/wallet-tracker-docs/blob/main/PRIVACY.md

## Terms of Service

For the full terms of service:
- **Terms**: https://github.com/antigravitylabs/wallet-tracker-docs/blob/main/TERMS.md

## Contributing

The Wallet Balance Tracker is open source! If you'd like to contribute:
- **Repository**: https://github.com/antigravitylabs/wallet-tracker-docs
- **Contributions**: Pull requests are welcome

## Community

- **GitHub**: https://github.com/antigravitylabs
- **Discussions**: https://github.com/antigravitylabs/wallet-tracker-docs/discussions

## Uninstalling

To remove the Add-on:

1. Open your Google Sheet
2. Go to **Extensions > Add-ons > Manage add-ons**
3. Find "Wallet Balance Tracker"
4. Click **Manage > Remove**

## Additional Resources

### RPC Providers

Recommended RPC providers:
- **Infura**: https://infura.io
- **Alchemy**: https://alchemy.com
- **QuickNode**: https://quicknode.com
- **Ankr**: https://ankr.com

### Blockchain Explorers

Verify your balances on:
- **Ethereum**: https://etherscan.io
- **Polygon**: https://polygonscan.com
- **BSC**: https://bscscan.com
- **Arbitrum**: https://arbiscan.io

---

**Last Updated**: January 2025

For the latest updates and documentation, visit: https://github.com/antigravitylabs/wallet-tracker-docs
