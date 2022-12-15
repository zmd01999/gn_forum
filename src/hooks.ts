import { useContext, useRef } from "react";
import { ArticleService } from "./api/ArticleService";
import { AuthService } from "./api/AuthService";
import { CommentService } from "./api/CommentService";
import { ProfileService } from "./api/ProfileService";
import { ProjectService } from "./api/ProjectService";
import { ServicesContext } from "./models/Services";

export function useAuthService(): AuthService {
  const services = useContext(ServicesContext);
  if (!services.authService) {
    throw new Error("Auth Service is not initialized.");
  }

  return services.authService;
}

export function useCommentService(): CommentService {
  const services = useContext(ServicesContext);
  if (!services.commentService) {
    throw new Error("Auth Service is not initialized.");
  }

  return services.commentService;
}

export function useArticleService(): ArticleService {
  const services = useContext(ServicesContext);
  if (!services.articleService) {
    throw new Error("Article Service is not initialized.");
  }
  return services.articleService;
}

export function useProfileService(): ProfileService {
  const services = useContext(ServicesContext);
  if (!services.profileService) {
    throw new Error("Profile Service is not initialized.");
  }

  return services.profileService;
}

export function useProjectService(): ProjectService {
  const services = useContext(ServicesContext);
  if (!services.projectService) {
    throw new Error("Project Service is not initialized.");
  }

  return services.projectService;
}

export function useConstructor(callBack=()=>{}) {
  const hasBeenCalled = useRef(false)
  if(hasBeenCalled.current) {
    return
  }
  callBack();
  hasBeenCalled.current = true
}
