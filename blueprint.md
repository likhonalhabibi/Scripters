# Scripters Blueprint

## 1. Schema Metadata
- **Schema Name:** Scripters eCommerce Blueprint
- **Version:** 1.0.0
- **Last Updated:** 2025-10-24
- **Author:** Likhon Sheikh
- **Description:** A structured schema and development plan for the Scripters eCommerce platform, built with Next.js and Bun runtime, integrating customizable wallet support using RainbowKit.

### Version History
- **1.0.0** — Initial blueprint structure based on plan.md conventions.

## 2. Custom Data Types

### Supported Wallets
- **Values:** rainbowWallet, walletConnectWallet, metamaskWallet, phantomWallet
- **Progressions:**
  - Import → Configure Connectors → Display → Test Transactions
- **MD-representations:**
  - `- [ ]`: Wallet not configured
  - `- [x]`: Wallet active and verified

### Runtime Environments
- **Values:** bun, node, nextjs
- **Progressions:**
  - Install → Configure → Build → Deploy
- **MD-representations:**
  - `- [bun]`: Bun runtime active
  - `- [nextjs]`: Next.js framework configured

### Vendor Features
- **Values:** singleVendorShop, digitalDownloads, checkoutAPI, themeCustomization
- **MD-representations:**
  - `- 🛍️`: eCommerce feature enabled
  - `- 🔧`: Customization module active

## 3. Objects

### WalletIntegration
- **name:** String (required)
- **package:** String (required)
- **connector:** String (optional)
- **status:** Supported Wallets (required)

### RuntimeSetup
- **framework:** Runtime Environments (required)
- **dependencies:** List (optional)
- **version:** String (optional)
- **commands:** Array (optional)

### VendorFeature
- **featureName:** Vendor Features (required)
- **description:** String (optional)
- **enabled:** Boolean (required)

## 4. Plan Schema

### Scripters eCommerce Plan
- **Overview:** String (required)
- **Runtime:** RuntimeSetup (required)
- **Wallets:** List of WalletIntegration (required)
- **VendorFeatures:** List of VendorFeature (optional)
- **DevelopmentPhases:** List of Task (required)

#### Task
- **Description:** String (required)
- **Phase:** String (optional)
- **Due Date:** Date (optional)
- **Status:** Task Status (required)

## 5. Plan Structure
1. **Overview**
   - Project summary, goals, and scope.
2. **Runtime**
   - Environment setup (Next.js, Bun runtime).
3. **Wallet Integrations**
   - Wallet customization and connectors.
4. **Vendor Features**
   - Optional modules, digital goods handling.
5. **Development Phases**
   - Task progression using modified `todo-list-schema.md` logic.

## 6. Development Example
- **Phase:** Wallet Integration
- **Runtime:** nextjs
- **Task:** Connect Rainbow + WalletConnect
- **Progress:** `- [x]` Tested ✅

- **Description:** Configure Bun runtime
- **Runtime:** bun
- **Dependencies:** none
- **Status:** Done

- **Description:** Add RainbowKit wallet connectors
- **Runtime:** nextjs
- **Dependencies:** bun setup complete
- **Status:** In Progress
