//package com.freight.common;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Map.Entry;
//
//import javax.persistence.EntityManager;
//import javax.persistence.TypedQuery;
//import javax.persistence.criteria.CriteriaBuilder;
//import javax.persistence.criteria.CriteriaQuery;
//import javax.persistence.criteria.Expression;
//import javax.persistence.criteria.Predicate;
//import javax.persistence.criteria.Root;
//
//import com.freight.common.ADExpression.ADPredicate;
//import com.freight.util.EnvUtil;
//import com.freight.util.StringUtil;
//import com.google.common.collect.Iterables;
//import com.google.inject.Inject;
//import com.google.inject.persist.Transactional;
//
//@SuppressWarnings({ "rawtypes", "unchecked" })
//public class CommonDao {
//
//    @Inject
//    protected EntityManager em;
//
//    public <T extends EntityBase> T find(Class<T> clazz, Object key) {
//        return em.find(clazz, key);
//    }
//
//    @Transactional
//    public <T extends EntityBase> void delete(T entity) {
//        Object managed = em.merge(entity);
//        em.remove(managed);
//    }
//
//    @Transactional
//    public <T extends EntityBase> void update(T entity) {
//        initEntity(entity);
//        em.persist(entity);
//    }
//
//    @Transactional
//    public <T extends EntityBase> void saveOrUpdate(T entity) {
//        initEntity(entity);
//        em.merge(entity);
//    }
//
//    public <T extends EntityBase> List<T> selectByExpr(Class<T> entityClazz, ADExpression expr, int offset, int limit) {
//        CriteriaBuilder cb = em.getCriteriaBuilder();
//        CriteriaQuery cq = cb.createQuery(entityClazz);
//        Root<T> root = cq.from(entityClazz);
//        cq.where(ServiceUtil.buildWhere(cb, root, expr));
//        TypedQuery dataQuery = em.createQuery(cq);
//        dataQuery.setFirstResult(offset);
//        dataQuery.setMaxResults(limit);
//        return dataQuery.getResultList();
//    }
//
//    public <T extends EntityBase> List<T> selectByQuery(Class<T> entityClazz, String query,
//                                                        Map<String, Object> paramMap, int offset, int limit) {
//        TypedQuery<T> typedQuery = em.createQuery(query, entityClazz);
//        if (null != paramMap) {
//            for (Entry<String, Object> entry : paramMap.entrySet()) {
//                typedQuery.setParameter(entry.getKey(), entry.getValue());
//            }
//        }
//        typedQuery.setFirstResult(offset);
//        typedQuery.setMaxResults(limit);
//        return typedQuery.getResultList();
//    }
//
//    public static void initEntity(Object entity) {
//        if (entity instanceof EntityBase) {
//            EntityBase adEntity = (EntityBase) entity;
//            if (null == adEntity.getCreatedBy()) {
//                adEntity.setCreatedBy(EnvUtil.getUser());
//                adEntity.setCreated(EnvUtil.currentTimestamp());
//                adEntity.setActive(true);
//            }
//            adEntity.setUpdatedBy(EnvUtil.getUser());
//            adEntity.setUpdated(EnvUtil.currentTimestamp());
//        }
//    }
//
//    public static Map<String, Object> toMap(String pName, Object pValue) {
//        Map<String, Object> paramMap = new HashMap<String, Object>();
//        paramMap.put(pName, pValue);
//        return paramMap;
//    }
//
//    protected <T> T selectOneByNamedQuery(String queryName, Class<T> clazz) {
//        return selectOneByNamedQuery(queryName, clazz, null);
//    }
//
//    /**
//     * @param pCtx
//     * @param queryName
//     * @param clazz
//     * @param paramMap
//     * @return
//     */
//    protected <T> T selectOneByNamedQuery(String queryName, Class<T> clazz, Map<String, Object> paramMap) {
//        try {
//            TypedQuery<T> query = em.createNamedQuery(queryName, clazz);
//            if (null != paramMap) {
//                for (Entry<String, Object> pEntry : paramMap.entrySet()) {
//                    query.setParameter(pEntry.getKey(), pEntry.getValue());
//                }
//            }
//            // query.setMaxResults(1);
//            List<T> resultList = query.getResultList();
//            T entity = Iterables.getFirst(resultList, null);
//            return entity;
//        } catch (Exception ex) {
//            ex.printStackTrace();
//            return null;
//        }
//    }
//
//    /**
//     * @param pCtx
//     * @param queryName
//     * @param clazz
//     * @return
//     */
//    protected <T> List<T> selectListByNamedQuery(String queryName, Class<T> clazz) {
//        return selectListByNamedQuery(queryName, clazz, null);
//    }
//
//    /**
//     * @param pCtx
//     * @param queryName
//     * @param clazz
//     * @param paramMap
//     * @return
//     */
//    protected <T> List<T> selectListByNamedQuery(String queryName, Class<T> clazz, Map<String, Object> paramMap) {
//        try {
//            TypedQuery<T> query = em.createNamedQuery(queryName, clazz);
//            if (null != paramMap) {
//                for (Entry<String, Object> pEntry : paramMap.entrySet()) {
//                    query.setParameter(pEntry.getKey(), pEntry.getValue());
//                }
//            }
//            List<T> list = query.getResultList();
//            return list;
//        } catch (Exception ex) {
//            ex.printStackTrace();
//            return null;
//        }
//    }
//
//    static class ServiceUtil {
//
//        public static StringBuffer appendTab(StringBuffer buffer, int level) {
//            for (; level > 0; level--) {
//                buffer.append("\t");
//            }
//            return buffer;
//        }
//
//        public static Predicate buildWhere(CriteriaBuilder cb, Root<?> root, ADExpression expr) {
//            if (null == expr) {
//                return null;
//            }
//            if (expr.isParent()) {
//                ADPredicate pred = (ADPredicate) expr;
//                if (null == pred.getExpressions()) {
//                    return null;
//                }
//                List<Predicate> predList = new ArrayList<Predicate>(pred.getExpressions().size());
//                for (ADExpression subExpr : pred.getExpressions()) {
//                    Predicate subPred = buildWhere(cb, root, subExpr);
//                    if (null != subPred) {
//                        predList.add(subPred);
//                    }
//                }
//                Predicate[] predArray = new Predicate[predList.size()];
//                switch (pred.getBooleanOperator()) {
//                    case And:
//                        return cb.and(predList.toArray(predArray));
//                    case Or:
//                        return cb.or(predList.toArray(predArray));
//                    default:
//                        break;
//                }
//            } else {
//                Expression target = root.get(expr.getColumnName());
//                switch (expr.getFieldOperator()) {
//                    case IsNull:
//                        return cb.isNull(target);
//                    case IsNotNull:
//                        return cb.isNotNull(target);
//                    case Equal:
//                        return cb.equal(target, expr.getValue1());
//                    case NotEqual:
//                        return cb.notEqual(target, expr.getValue1());
//                    case Gt:
//                        return cb.gt(target, StringUtil.toNumber(expr.getValue1()));
//                    case Ge:
//                        return cb.ge(target, StringUtil.toNumber(expr.getValue1()));
//                    case Lt:
//                        return cb.lt(target, StringUtil.toNumber(expr.getValue1()));
//                    case Le:
//                        return cb.le(target, StringUtil.toNumber(expr.getValue1()));
//                    case Between:
//                        return cb.between(target, StringUtil.toString(expr.getValue1()),
//                                          StringUtil.toString(expr.getValue2()));
//                    case NotBetween:
//                        return cb.not(cb.between(target, StringUtil.toString(expr.getValue1()),
//                                                 StringUtil.toString(expr.getValue2())));
//                    case Like:
//                        return cb.like(target, StringUtil.toString(expr.getValue1()));
//                    case NotLike:
//                        return cb.notLike(target, StringUtil.toString(expr.getValue1()));
//                    default:
//                        break;
//                }
//            }
//            return null;
//        }
//
//        public static void toString(ADExpression expr, StringBuffer buffer, int level) {
//            if (null == expr) {
//                return;
//            }
//            if (expr.isParent()) {
//                ADPredicate pred = (ADPredicate) expr;
//                ServiceUtil.appendTab(buffer, level).append(pred.getBooleanOperator().getSymbol()).append(" ");
//                for (ADExpression subExpr : pred.getExpressions()) {
//                    toString(subExpr, buffer, level + 1);
//                }
//            } else {
//                ServiceUtil.appendTab(buffer, level).append("(");
//                buffer.append(expr.getColumnName()).append(" ").append(expr.getFieldOperator().getSymbol()).append(" ").append(expr.getValue1());
//                buffer.append(")").append("\n");
//            }
//        }
//
//        public static <T> List<T> wrapper(List<T> jpaList) {
//            return new ArrayList<T>(jpaList);
//        }
//
//    }
//}
