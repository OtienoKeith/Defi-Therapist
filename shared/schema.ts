import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const wallets = pgTable("wallets", {
  id: serial("id").primaryKey(),
  address: text("address").notNull().unique(),
  lastAnalyzed: timestamp("last_analyzed"),
});

export const tradingAnalyses = pgTable("trading_analyses", {
  id: serial("id").primaryKey(),
  walletId: integer("wallet_id").notNull(),
  analysisData: jsonb("analysis_data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWalletSchema = createInsertSchema(wallets).pick({
  address: true,
});

export const insertTradingAnalysisSchema = createInsertSchema(tradingAnalyses).pick({
  walletId: true,
  analysisData: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertWallet = z.infer<typeof insertWalletSchema>;
export type Wallet = typeof wallets.$inferSelect;

export type InsertTradingAnalysis = z.infer<typeof insertTradingAnalysisSchema>;
export type TradingAnalysis = typeof tradingAnalyses.$inferSelect;
