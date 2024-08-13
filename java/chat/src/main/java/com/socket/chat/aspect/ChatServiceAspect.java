package com.socket.chat.aspect;



import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;

@Aspect
@Component
@RequiredArgsConstructor
@Slf4j
public class ChatServiceAspect {

    @Pointcut("within(com.socket.chat.controller..*)")
    public void applicationPackagePointcut() {

    }

    @Before("applicationPackagePointcut()")
    public void logBefore(JoinPoint joinPoint) {


        System.out.println("\n----------------------------------------------------------------\n");
        log.info("\nEntering method: {} with arguments: {}\n",
                joinPoint.getSignature().toShortString(),
                joinPoint.getArgs());

    }

    @Around("applicationPackagePointcut()")
    public Object measureExecutionTime(ProceedingJoinPoint pjp) throws Throwable
    {

        Object[] requests =  pjp.getArgs();
        ResponseEntity output = (ResponseEntity) pjp.proceed();
        return output;

    }



    @AfterReturning(pointcut = "applicationPackagePointcut()", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        System.out.println("\n----------------------------------------------------------------\n");
        log.info("\nExiting method: {} with result: {}\n",
                joinPoint.getSignature().toShortString(),
                result);

    }

    @AfterThrowing(pointcut = "applicationPackagePointcut()", throwing = "error")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable error) {
        System.out.println("\n----------------------------------------------------------------\n");
        log.error("\nMethod: {} threw an exception: {}\n",
                joinPoint.getSignature().toShortString(),
                error.getMessage());
    }



}
