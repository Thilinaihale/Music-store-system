import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type AuthPayload = {
  userId: string;
  role: "admin" | "customer";
};

export type AuthenticatedRequest = Request & {
  user?: AuthPayload;
};

export function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "Missing or invalid authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "change_this_in_production",
    ) as AuthPayload;

    req.user = decoded;
    next();
  } catch (_error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

export function requireRole(roles: Array<"admin" | "customer">) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
}
